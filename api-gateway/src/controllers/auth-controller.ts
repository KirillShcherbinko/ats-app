import { Request, Response } from 'express';
import { grpcClient } from '../grpc-client';

const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email and password are required' 
        });
      }

      const response = await grpcClient.login(email, password);
      
      // Устанавливаем refresh token в httpOnly cookie
      res.cookie(REFRESH_TOKEN_COOKIE_NAME, response.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60 * 60 * 1000, // 10 часов
      });

      res.json({
        access_token: response.access_token,
        expires_in: response.expires_in,
        user: response.user
      });
    } catch (error: any) {
      if (error.code === 13 || error.message.includes('Invalid')) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.status(500).json({ error: error.message});
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { last_name, first_name, patronymic, email, password } = req.body;
      
      if (!last_name || !first_name || !email || !password) {
        return res.status(400).json({ 
          error: 'Required fields are missing' 
        });
      }

      const response = await grpcClient.register({
        last_name,
        first_name,
        patronymic,
        email,
        password
      });

      // Устанавливаем cookies
      res.cookie(REFRESH_TOKEN_COOKIE_NAME, response.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60 * 60 * 1000,
      });

      res.status(201).json({
        access_token: response.access_token,
        expires_in: response.expires_in,
        user: response.user
      });
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        return res.status(409).json({ error: 'User already exists' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  logout: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
      
      if (refreshToken) {
        await grpcClient.logout(refreshToken);
      }

      // Очищаем cookies
      res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
      
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
      
      if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not found' });
      }

      const response = await grpcClient.refresh(refreshToken);

      // Обновляем cookies
      res.cookie(REFRESH_TOKEN_COOKIE_NAME, response.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 10 * 60 * 60 * 1000,
      });

      res.json({
        access_token: response.access_token,
        expires_in: response.expires_in,
        user: response.user
      });
    } catch (error: any) {
      if (error.message.includes('No refresh token') || 
          error.message.includes('Invalid refresh token')) {
        res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
        return res.status(401).json({ error: 'Invalid refresh token' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      // Получаем user из middleware
      const user = (req as any).user;
      
      if (!user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      // Получаем свежую информацию о пользователе
      const response = await grpcClient.getUser(user.user_id);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};