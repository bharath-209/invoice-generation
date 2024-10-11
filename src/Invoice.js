import React, { useState, useRef } from 'react';
import { Box, Typography, Grid, Paper, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReactToPrint } from 'react-to-print';

const Invoice = () => {
  const [billTo, setBillTo] = useState({ name: '', address: '' });
  const [shipTo, setShipTo] = useState({ name: '', address: '' });
  const [qty, setQty] = useState('');
  const [product, setProduct] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [items, setItems] = useState([]);

  const invoiceRef = useRef();

  const handleAddItem = () => {
    const newItem = {
      qty,
      product,
      unitPrice: parseFloat(unitPrice),
      amount: parseFloat(qty) * parseFloat(unitPrice),
    };
    setItems([...items, newItem]);
    setQty('');
    setProduct('');
    setUnitPrice('');
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: 'Invoice',
  });

  const invoiceData = {
    companyName: 'East Repair Inc.',
    companyAddress: '1912 Harvest Lane, New York, NY 12210',
    billTo,
    shipTo,
    invoiceInfo: {
      number: 'US-001',
      date: new Date().toLocaleDateString(),
      poNumber: new Date().toLocaleDateString(),
      dueDate: new Date().toLocaleDateString(),
      gstIn: '123456789'
    },
    items,
    subtotal: items.reduce((acc, item) => acc + item.amount, 0),
    salesTax: 0.0625 * items.reduce((acc, item) => acc + item.amount, 0),
    total: 1.0625 * items.reduce((acc, item) => acc + item.amount, 0),
    signature: 'Bharath',
    terms: 'Payment is due within 15 days. Please make checks payable to: East Repair Inc.',
  };

  return (
    <Box sx={{ padding: 4, backgroundColor:'#f3e5f5' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 3, color: '#3f51b5'}}>Bill Details</Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Bill To Name"
            fullWidth
            value={billTo.name}
            onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <TextField
            label="Bill To Address"
            fullWidth
            multiline
            rows={2}
            value={billTo.address}
            onChange={(e) => setBillTo({ ...billTo, address: e.target.value })}
            sx={{ marginBottom: 2, width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Ship To Name"
            fullWidth
            value={shipTo.name}
            onChange={(e) => setShipTo({ ...shipTo, name: e.target.value })}
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <TextField
            label="Ship To Address"
            fullWidth
            multiline
            rows={2}
            value={shipTo.address}
            onChange={(e) => setShipTo({ ...shipTo, address: e.target.value })}
            sx={{ marginBottom: 2, width: '100%' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={3} md={1}>
          <TextField
            label="QTY"
            fullWidth
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            sx={{ marginBottom: 2, width: '100%' }}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <TextField
            label="Product"
            fullWidth
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            sx={{ marginBottom: 2, width: '100%' }}
          />
        </Grid>
        <Grid item xs={3} md={1.1}>
          <TextField
            label="Unit Price"
            fullWidth
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            sx={{ marginBottom: 2, width: '100%' }}
          />
        </Grid>
        <Grid item xs={3} md={1.2}>
          <Button variant="contained" fullWidth onClick={handleAddItem}>
            Add Item
          </Button>
        </Grid>
      </Grid>

      <Paper ref={invoiceRef} 
       sx={{
                   padding: 4,
                   marginTop: 4,
                   backgroundColor: 'white',
                   backgroundImage: 'url(https://i.pinimg.com/474x/19/88/b9/1988b9e1a5932267b8440d95dce365ac.jpg)', // Add your background image path here
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   backgroundRepeat: 'no-repeat',
                   '@media print': {
                     width: '210mm', // A4 width
                     height: '297mm', // A4 height
                     margin: '0 auto',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                   },
                 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>INVOICE</Typography>
            <Typography variant="subtitle1">{invoiceData.companyName}</Typography>
            <Typography variant="subtitle2">{invoiceData.companyAddress}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box >
              <label style={{display:'flex', justifyContent: 'right'}}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color:'#3f51b5' }}>INVOICE # : </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{invoiceData.invoiceInfo.number}</Typography>
              </label>
              <label style={{display:'flex', justifyContent: 'right'}}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color:'#3f51b5' }}>INVOICE DATE : </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{invoiceData.invoiceInfo.date}</Typography>
              </label>
              <label style={{display:'flex', justifyContent: 'right'}}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color:'#3f51b5' }}>P.O.# : </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{invoiceData.invoiceInfo.poNumber}</Typography>
              </label>
              <label style={{display:'flex', justifyContent: 'right'}}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color:'#3f51b5' }}>DUE DATE : </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{invoiceData.invoiceInfo.dueDate}</Typography>
              </label>
              <label style={{display:'flex', justifyContent: 'right'}}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color:'#3f51b5' }}>GSTIN : </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{invoiceData.invoiceInfo.gstIn}</Typography>
              </label>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>BILL TO</Typography>
            <Typography variant="body2">{invoiceData.billTo.name}</Typography>
            <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{invoiceData.billTo.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>SHIP TO</Typography>
            <Typography variant="body2">{invoiceData.shipTo.name}</Typography>
            <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>{invoiceData.shipTo.address}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{color: '#3f51b5'}}>S.No</TableCell>
                <TableCell sx={{color: '#3f51b5'}}>PRODUCTS</TableCell>
                <TableCell sx={{color: '#3f51b5'}}>UNIT PRICE</TableCell>
                <TableCell sx={{color: '#3f51b5'}}>QTY</TableCell>
                <TableCell sx={{color: '#3f51b5'}}>AMOUNT</TableCell>
                <TableCell sx={{color: '#3f51b5'}}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>₹{item.unitPrice}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>₹{item.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <Grid container spacing={3} sx={{justifyContent:'right'}}>
          <Grid item xs={3}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1">Subtotal: ₹{invoiceData.subtotal.toFixed(2)}</Typography>
              <Typography variant="body1">Sales Tax (6.25%): ₹{invoiceData.salesTax.toFixed(2)}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total: ₹{invoiceData.total.toFixed(2)}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 3 }} />

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>TERMS & CONDITIONS</Typography>
          <Typography variant="body2">{invoiceData.terms}</Typography>
         </Box>

        <Box sx={{ textAlign: 'right', marginTop: 3 }}>
          <Typography variant="body2">Signed by:</Typography>
          <Typography variant="h6" sx={{ fontFamily: 'cursive', color: '#3f51b5' }}>{invoiceData.signature}</Typography>
        </Box>
      </Paper>

      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default Invoice;



