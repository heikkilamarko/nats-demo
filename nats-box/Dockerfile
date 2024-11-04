FROM natsio/nats-box
RUN apk update && apk add tmux
ENV TERM=xterm
ENTRYPOINT ["tail", "-f", "/dev/null"]
