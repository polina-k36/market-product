import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: Number(process.env.PORT),
  clientUrl: process.env.BASE_URL_CLIENT,
}));
