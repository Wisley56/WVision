export class Room {
    constructor(id, name, capacity, type) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.type = type;
    }

    getId(){
        return this.id;
    }
    setId(id){
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getCapacity() {
        return this.capacity;
    }
    setCapacity(capacity) {
        this.capacity = capacity;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    toString(){
        return console.log(`{ ${this.id}, ${this.name}, ${this.capacity}, ${this.type} }`)
    }
    toJSON() {
        return {
          id: this.id,
          name: this.name,
          capacity: this.capacity,
          type: this.type
        };
      }
      
}