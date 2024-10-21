FROM node:16-alpine3.15 as builder
WORKDIR /home/Realtime-chat-app-react-ui
COPY ./ /home/Realtime-chat-app-react-ui

RUN npm config set registry http://registry.npm.taobao.org
RUN npm install
RUN npm run build && rm -rf ./node_modules

WORKDIR /home/Realtime-chat-app-react-ui
COPY --from=builder /home/Realtime-chat-app-react-ui/build /home/Realtime-chat-app-react-ui
RUN npm config set registry http://registry.npm.taobao.org
RUN npm install -g serve

CMD ["serve", "-s"]


