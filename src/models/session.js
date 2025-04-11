export class Session {
    constructor(id, movieId, roomId, datetime, price, language, format) {
      this.id = id;
      this.movieId = movieId;
      this.roomId = roomId;
      this.datetime = datetime;
      this.price = price;
      this.language = language;
      this.format = format;
    }
  
    getId() {
      return this.id;
    }
    setId(id) {
      this.id = id;
    }
  
    getMovieId() {
      return this.movieId;
    }
    setMovieId(movieId) {
      this.movieId = movieId;
    }
  
    getRoomId() {
      return this.roomId;
    }
    setRoomId(roomId) {
      this.roomId = roomId;
    }
  
    getDatetime() {
      return this.datetime;
    }
    setDatetime(datetime) {
      this.datetime = datetime;
    }
  
    getPrice() {
      return this.price;
    }
    setPrice(price) {
      this.price = price;
    }
  
    getLanguage() {
      return this.language;
    }
    setLanguage(language) {
      this.language = language;
    }
  
    getFormat() {
      return this.format;
    }
    setFormat(format) {
      this.format = format;
    }
  
    toJSON() {
      return {
        id: this.id,
        movieId: this.movieId,
        roomId: this.roomId,
        datetime: this.datetime,
        price: this.price,
        language: this.language,
        format: this.format,
      };
    }
  
    toString() {
      return `Session [${this.id}] - Filme: ${this.movieId}, Sala: ${this.roomId}, DataHora: ${this.datetime}, Preço: ${this.price}, Idioma: ${this.language}, Formato: ${this.format}`;
    }
  }
  