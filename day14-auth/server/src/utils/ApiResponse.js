class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = true;
  }
}
module.exports = ApiResponse;
