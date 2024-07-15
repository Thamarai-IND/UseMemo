import React, { useEffect, useMemo, useState } from 'react'

const UseMemo = () => {

    const [data, setData] = useState([]);
    const [theme, setTheme] = useState(false);

    async function fetchAllProducts() {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const result = await response.json();

            if(result && result.products) setData(result.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    },[]);

    // console.log(data);

    function filterProductsByPrice(getProducts) {
        console.log('this is getting called');
        return getProducts && getProducts.length > 0 ? getProducts.filter(item => item.price > 50) : [];
    }

    const memorizeFilterProductsByPrice = useMemo(() => filterProductsByPrice(data), [data]);
  return (
    <div>
        <h1>Use Memo Hook</h1>
        <ul>
            {
                memorizeFilterProductsByPrice.map(item => (<li key={item.id}>{item.title}</li>))
            }
        </ul>
        <button onClick={()=> setTheme(!theme)}>Toggle Theme</button>
        <h2>
            {
                theme ? 'Light' : 'Dark'
            }
        </h2>
    </div>
  )
}

export default UseMemo