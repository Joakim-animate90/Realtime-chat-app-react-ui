FROM node:16-alpine3.15 as builder
WORKDIR /home/realtime-chat-app-react-ui
COPY ./ /home/realtime-chat-app-react-ui

RUN npm config set registry http://registry.npm.taobao.org
RUN npm install
RUN npm run build && rm -rf ./node_modules

WORKDIR /home/realtime-chat-app-react-ui
COPY --from=builder /home/realtime-chat-app-react-ui/build /home/realtime-chat-app-react-ui
RUN npm config set registry http://registry.npm.taobao.org
RUN npm install -g serve

CMD ["serve", "-s"]


