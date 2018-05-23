
export class SharedService {
    constructor() {}
    delElArray(arr, id) {
        return arr.filter(a => {
            return a.id != id;
        })
    }
}