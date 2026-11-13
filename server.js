import app from "./app.js";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error(
    "PORT environment variable is required."
  );
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `CSE 341 Books API running on port ${PORT}`
  );
});
