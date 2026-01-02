# @optiwari-india/http-error

A minimal, framework-agnostic HTTP error class for Node.js applications, written in TypeScript and published as an ESM module.

This package is designed to standardize how HTTP errors are created and handled across Express / Fastify / NestJS / plain Node.js projects.

---

## ✨ Features

- ✅ Lightweight single `HttpError` class
- ✅ ESM-first (`type: module`)
- ✅ Written in TypeScript with type declarations
- ✅ Immutable HTTP status code (private field)
- ✅ Framework-agnostic (no Express dependency)
- ✅ Safe to use in async / await flows

---

## 📦 Installation

```bash
npm install @optiwari-india/http-error
```
## 🚀 Usage
Create and throw an HTTP error
```import { HttpError } from "@optiwari-india/http-error";

throw new HttpError("Unauthorized", 401);
```
## 🧩 Reading the HTTP status code

The HTTP status code is stored internally and exposed via a getter.
```
try {
  throw new HttpError("Not Found", 404);
} catch (err) {
  if (err instanceof HttpError) {
    console.log(err.statusCode); // 404
  }
}
```
### 🌐 Express.js Example
```js import express from "express";
import { HttpError } from "@optiwari-india/http-error";

const app = express();

app.get("/secure", (req, res) => {
  throw new HttpError("Unauthorized", 401);
});

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

export default app;
```
### 🤔 Why not use error.code directly?

In Node.js, Error.code is commonly used for system-level errors like:

* ECONNREFUSED

* ENOENT

* ETIMEDOUT

* To avoid conflicts and ambiguity, this package:

* Stores the HTTP status code privately

* Exposes it explicitly via error.statusCode

* This makes the intent clear and prevents accidental misuse.

## 🧠 Design Philosophy

* Single responsibility – represents only HTTP-related errors

* No magic – explicit constructor arguments

* No framework lock-in

* Safe defaults – falls back to 500 if not handled

## 📄 API
```new HttpError(message: string, code?: number)```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| message   | string | —       | Error message |
| code      | number | 500     | HTTP status code |
### Constructor
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| message   | string | —       | Error message |
| code      | number | 500     | HTTP status code |
### Properties
| Property | Type | Description |
|----------|------|-------------|
| message  | string | Error message |
| statusCode | number | HTTP status code (read-only) |
## 🛡️ License

MIT © Om Prakash Tiwari