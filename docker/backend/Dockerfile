FROM golang:1.16-alpine

WORKDIR /go/src

RUN apk upgrade --update && \
    apk --no-cache add git

RUN go get -u github.com/gin-gonic/gin

CMD ["go", "run", "main.go"]
