export class Movie{
    constructor(id, title, genre, classification, description, duration, premiereDate, image = ""){
        this.id = id;;
        this.title = title;
        this.genre = genre;
        this.classification = classification;
        this.description = description;
        this.duration = duration;
        this.premiereDate = premiereDate;
        this.image = image
    }
   
    getId(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }
    getTitle(){
        return this.title;
    }
    setTitulo(title){
        this.title = title;
    }
    getGenero(){
        return this.genre;
    }
    setGenero(genre){
        this.genre = genre;
    }
    getClassificacao(){
        return this.classification;
    }
    setClassificacao(classification){
        this.classification = classification;
    }
    getDescription(){
        return this.description;
    }
    setDescription(description){
        this.description = description;
    }
    getDuracao(){
        return this.duration;
    }
    setDuracao(duration){
        this.duration = duration;
    }
    getDataEstreia(){
        return this.premiereDate;
    }
    setDataEstreia(premiereDate){
        this.premiereDate = premiereDate;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }

    toString(){
        return console.log(`{ ${this.id}, ${this.title}, ${this.genre}, ${this.classification}, ${this.duration}, ${this.premiereDate}, ${this.image} }`)
    }
}