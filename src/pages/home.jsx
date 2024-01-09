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


  const handleBarcodeChange = (e) => {
    const enteredBarcode = e.target.value;
    setBarcode(enteredBarcode);

    // Find the corresponding detail for the entered barcode
    const matchingDetail = detailData.find((detail) => detail.barcode === enteredBarcode);

    // Update input state based on the matching detail
    if (matchingDetail) {
      setInput({
        item: matchingDetail.item,
        price: matchingDetail.price
      });

      // Automatically add the item to the invoice
      auto && handleAddToInvoice(matchingDetail.barcode, matchingDetail.item, matchingDetail.price);
    } else {
      // Clear input state if no match is found
      setInput({
        item: '',
        price: ''
      });
    }
  };

  const handleAddToInvoice = (barcode, itemName, itemPrice) => {
    // Check if the item with the same barcode is already in the invoice
    const existingItem = invoice.find((invItem) => invItem.barcode === barcode);

    if (existingItem) {
      // If the item is already in the invoice, update its quantity
      const updatedInvoice = invoice.map((invItem) =>
        invItem.barcode === barcode ? { ...invItem, quantity: invItem.quantity + 1 } : invItem
      );

      setInvoice(updatedInvoice);
    } else {
      // If the item is not in the invoice, add it with quantity 1
      setInvoice([...invoice, { barcode, item: itemName, quantity: 1, price: itemPrice }]);
    }

    // Update the total
    setTotal(total + parseFloat(itemPrice));
    barinput.current.focus();
  };


  const deletee = (code) => {
    // console.log("input code",code);
    const deleteditem = invoice.find((item => item.barcode == code));
    const newe = invoice.filter((val) => val.barcode != code)
    setInvoice(newe);

    setTotal(total - deleteditem.price * deleteditem.quantity);
  }


  const minus = (code) => {
    const df = invoice.map((val, ind) => {
      if (val.barcode == code) {
        if (val.quantity == 1) {
          // console.log("aaya deleted me", code);
          setTimeout(() => {
            deletee(code);
          }, 50);
          return val;
        } else {
          setTotal(total - val.price);
          return { ...val, quantity: val.quantity - 1 }
        }
      } else {
        return val
      }
    })
    setInvoice(df);
  }
  const plus = (code) => {
    const df = invoice.map((val, ind) => {
      if (val.barcode == code) {
        setTotal(total + val.price);
        return { ...val, quantity: val.quantity + 1 }
      } else {
        return val;
      }
    })
    setInvoice(df);
  }

  return (
    <div className='home'>
      <div className="left">
        <label htmlFor="barcodeInput">Enter Barcode:</label>
        <input type="text" ref={barinput} id="barcodeInput" value={barcode} onChange={handleBarcodeChange} />
        <br /> <br />
        <div>
          <label htmlFor="itemInput">Item:</label>
          <input type="text" id="itemInput" value={input.item} readOnly />
        </div>

        <div>
          <label htmlFor="priceInput">Price:</label>
          <input type="text" id="priceInput" value={input.price} readOnly />
        </div>

        <button onClick={() => handleAddToInvoice(barcode, input.item, input.price)}>
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
                  <td><i onClick={() => minus(invItem.barcode)} className="fa fa-minus" aria-hidden="true"></i>
                    {invItem.quantity}
                    <i onClick={() => plus(invItem.barcode)} className="fa fa-plus" aria-hidden="true"></i>
                  </td>
                  <td>{invItem.price.toFixed(2)}</td>
                  <td>{(invItem.quantity * invItem.price).toFixed(2)}</td>
                  <td><i onClick={() => deletee(invItem.barcode)} className="fa fa-trash-o" aria-hidden="true"></i></td>
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
    </div>
  );
};

export default DetailPage;
