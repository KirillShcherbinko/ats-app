import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../proto/user.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const userPackage = protoDescriptor.user as any;

class GrpcClient {
  private client: any;
  private static instance: GrpcClient;

  private constructor() {
    const userServiceUrl = process.env.USER_SERVICE_URL || 'user-service:50051';
    this.client = new userPackage.UserService(
      userServiceUrl,
      grpc.credentials.createInsecure()
    );
  }

  static getInstance(): GrpcClient {
    if (!GrpcClient.instance) {
      GrpcClient.instance = new GrpcClient();
    }
    return GrpcClient.instance;
  }

  private promisify<T>(method: Function, request: any): Promise<T> {
    return new Promise((resolve, reject) => {
      method.call(this.client, request, (error: any, response: T) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.promisify<any>(this.client.Login, { email, password });
  }

  async register(data: any) {
    return this.promisify<any>(this.client.Register, data);
  }

  async logout(refreshToken: string) {
    return this.promisify<any>(this.client.Logout, { refresh_token: refreshToken });
  }

  async refresh(refreshToken: string) {
    return this.promisify<any>(this.client.Refresh, { refresh_token: refreshToken });
  }

  async validateToken(token: string) {
    return this.promisify<any>(this.client.ValidateToken, { token });
  }

  // User methods
  async getUsers(limit: number, page: number, searchQuery?: string) {
    return this.promisify<any>(this.client.GetUsers, { 
      limit, 
      page, 
      search_query: searchQuery 
    });
  }

  async getUser(id: string) {
    return this.promisify<any>(this.client.GetUser, { id });
  }

  async createUser(data: any) {
    return this.promisify<any>(this.client.CreateUser, data);
  }

  async deleteUser(id: string) {
    return this.promisify<any>(this.client.DeleteUser, { id });
  }
}

export const grpcClient = GrpcClient.getInstance();