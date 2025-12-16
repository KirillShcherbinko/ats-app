export const Login = async (call: any, callback: any) => {
  try {
    const result = await login(call.request.email, call.request.password);
    callback(null, result);
  } catch (error: any) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};
