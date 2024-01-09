import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './home.css';

const DetailPage = () => {
  const [barcode, setBarcode] = useState('');
  const barinput = useRef(null);
  const [auto, setauto] = useState(true);
  const [input, setInput] = useState({
    barcode: "",
    item: '',
    price: ''
  });
  const [invoice, setInvoice] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    barinput.current.focus();
  }, []);

  const detailData = [
    {
      barcode: '10',
      item: 'syensodyne',
      price: 50.36
    },
    {
      barcode: '11',
      item: 'Patanjali brush',
      price: 10.12
    },
    {
      barcode: '12',
      item: 'shirt',
      price: 380.9
    },
    {
      barcode: '13',
      item: 'trouser',
      price: 190.3
    }
  ];
  const getbarcode = (e) => {
    let inpval = e.target.value;
    setBarcode(inpval);

    const issearched = detailData.find((val) => val.barcode == inpval);

    issearched && setInput({
      barcode: issearched.barcode,
      item: issearched.item,
      price: issearched.price
    })
    !issearched && setInput({
      barcode: "",
      item: "",
      price: ""
    })
    auto && issearched && addToInvoice(issearched.barcode, issearched.item, issearched.price);
  }

  const addToInvoice = (barcode, itemName, itemPrice) => {
    const existingItem = invoice.find((val) => val.barcode == barcode);
    // console.log(barcode);

    if (existingItem) {
      const dfef = invoice.map((invItem) =>
        invItem.barcode == existingItem.barcode ? { ...invItem, quantity: invItem.quantity + 1 } : invItem
      )
      setInvoice(dfef);
    } else {
      setInvoice([...invoice, { barcode, item: itemName, quantity: 1, price: itemPrice }])
    }
    setTotal(total + itemPrice);
    barinput.current.focus();
  }

  const minus = (entry) => {
    if (entry.quantity == 1) {
      // setInvoice(invoice.filter((val) => val.barcode != entry.barcode))
      deletee(entry.barcode);
    } else {
      setInvoice(invoice.map((val) => val.barcode == entry.barcode ? { ...val, quantity: val.quantity - 1 } : val))
      setTotal(total - entry.price);
    }
  }
  const plus = (entry) => {
    setInvoice(invoice.map((val) => val.barcode == entry.barcode ? { ...val, quantity: val.quantity + 1 } : val))
    setTotal(total + entry.price);
  }
  const deletee =(barcode)=>{
    const entry = invoice.find((val)=> val.barcode == barcode ? val :null);
    const totalvalue = entry.quantity * entry.price;
    // console.log(totalvalue);
    setInvoice(invoice.filter((val) => val.barcode != barcode))
    setTotal(total-totalvalue);
  }

  return (
    <div>
      <label htmlFor="barcodeInput">Enter Barcode:</label>
      <input type="text" ref={barinput} id="barcodeInput" value={barcode} onChange={getbarcode} />
      <br /> <br />
      <div>
        <label htmlFor="itemInput">Item:</label>
        <input type="text" id="itemInput" value={input.item} readOnly />
      </div>

      <div>
        <label htmlFor="priceInput">Price:</label>
        <input type="text" id="priceInput" value={input.price} readOnly />
      </div>

      <button onClick={() => addToInvoice(barcode, input.item, input.price)}>
        Add to Invoice
      </button>

      <div>
        <h2>Invoice</h2>
        <table>
          <thead>
            <tr>
              <th>Barcode</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoice.map((invItem, index) => (
              <tr key={index}>
                <td>{invItem.barcode}</td>
                <td>{invItem.item}</td>
                <td><i onClick={() => minus(invItem)} className="fa fa-minus" aria-hidden="true"></i>
                  {invItem.quantity}
                  <i onClick={() => plus(invItem)} className="fa fa-plus" aria-hidden="true"></i>
                </td>
                <td>{invItem.price.toFixed(2)}</td>
                <td>{(invItem.quantity * invItem.price).toFixed(2)}</td>
                <td><i onClick={()=> deletee(invItem.barcode)} className="fa fa-trash-o" aria-hidden="true"></i></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total:</td>
              <td>Rs.{total.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="4">Round OFF:</td>
              <td>.{total.toFixed(2).split('.')[1]}</td>
            </tr>
            <tr>
              <td colSpan="4">Total Amount:</td>
              <td>Rs.{total.toFixed(2).split('.')[0]}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default DetailPage;
