class ProductService {
    _base = 'https://localhost:44313/Product'

    async getAll() {
        const resource = await fetch(this._base);
        const result = await resource.json();
        return result;
    }

    async getById(id) {
        const resource = await fetch(`${this._base}/${id}`);
        const result = await resource.json();
        return result;
    }

    async getByGender(gender) {
        const resource = await fetch(`${this._base}/Gender/${gender}`);
        const result = await resource.json();
        return result;
    }
}

export default ProductService