import './App.css';
import './bootstrap.min.css';
import { useState } from 'react';
const main = window.require('@electron/remote').require('./main')

function App() {
  const [form,setForm] = useState({
    name: '',
    price: 0,
    description: ''
  })

  const handleInputChange =(e)=> {
    const name = e.target.name
    setForm({
      ...form,
      [name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const result = await main.createProduct(form)
    }catch(err){
      console.log(err)
    }
   
  }
  return (
    <div className="row">
      <div className="col-md-6 p-4 my-auto">
              <form className="card card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" value={form.name} id="name" name="name" placeholder="Product name" className="form-control" autoFocus onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="number" value={form.price}  id="price" name="price" step="any" placeholder="Product price" className="form-control" onChange={handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <textarea id="description" value={form.description}  rows="3" name="description" placeholder="Products Description" className="form-control" onChange={handleInputChange} ></textarea>
                    </div>
                    <button className="btn btn-primary">
                        Save
                    </button>
              </form>
            </div>
            <div className="col-md-6">
                <div id="products"></div>
            </div>
    </div>
  );
}

export default App;
