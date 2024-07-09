package com.terabox.demo.exceptions;

public class TransactionalException extends RuntimeException {
    public TransactionalException() {
    }

    public TransactionalException(String message) {
        super(message);
    }

    public TransactionalException(String message, Throwable cause) {
        super(message, cause);
    }

    public TransactionalException(Throwable cause) {
        super(cause);
    }
}
