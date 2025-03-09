FROM node:lts-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# We'll mount the app directory as a volume, but we won't try to install
# dependencies during build time

EXPOSE 5173

# Use this command which will run pnpm install first, then start the dev server
CMD ["sh", "-c", "pnpm install && pnpm run dev -- --host 0.0.0.0"]