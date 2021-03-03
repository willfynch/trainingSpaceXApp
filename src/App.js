import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import './App.css';
import { Component } from 'react';
import { AppBar, IconButton, TextField, Toolbar, Typography, } from '@material-ui/core';
const axios = require('axios').default;
/* eslint-disable no-unused-expressions */



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      "api_url" : `https://api.spacexdata.com/v3/launches/`,
      "url" : `https://api.spacexdata.com/v3/launches/`,
      "isLoading" : true,
      "error_message" : "",
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  getData(url){
    
    axios.get(url)
    // We get the API response and receive data in JSON format
    .then(res => this.setState({data : res.data, isLoading: false}))
     // ...then we update the users state
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false }))
    
      

    
    
    // Where we're fetching data from url
    
  }
  
  onChange(e){
    this.setState(state => ({"url" : this.state.api_url + e.target.value}) );
  }

  async onSubmit(){

    const totalData = await axios.get(this.state.api_url).then(res => res.data);
    const entered = parseInt(this.state.url.slice(39));
    /*alert(`totalData : ${totalData.length}
    entered : ${entered}`);*/

    if(entered > totalData.length - 1 || !(/\/\d+$/.test(this.state.url)) ){
      this.setState(state => ({"error_message" : ` Entrez un entier entre 1 et ${totalData.length -1}`}));
    }else{
      this.getData(this.state.url); 
      this.setState(state => ({"error_message" : ""}));
    }
  
 
    
  }

 handleKeyPress(e){
   if(e.key == "Enter"){
     this.onSubmit();
    } 
 }




  render() {

    

    return (
      <div >


        <AppBar position="static">
          <Toolbar>
            
            <Typography variant="h4">
            SpaceX Launches
            </Typography>
            
          </Toolbar>
        </AppBar>

        <Card className="card">
        <h2>Enter a flight number from 1 to 110.</h2>
        <div className="formInput">
          
          <br/>
          <TextField
          className="textInput"
          variant="outlined"
            label="Type here"
            type="text"
            onChange={this.onChange}
            onKeyPress={this.handleKeyPress}
          />
          
          <Button 
          className="button"
            variant="contained" 
            color="primary"
            type="submit"
            onClick={this.onSubmit}
            
          >Submit</Button><span>{this.state.error_message}</span>
        </div>
        </Card>



        < br/>

        <TableContainer  className="tableContainer" component={Paper}>

        <Table size="medium" padding="default" stickyHeader aria-label="sticky table">
        <TableHead bg-color="primary" >

        <TableRow>
            <TableCell >Entry</TableCell>
            <TableCell> Data</TableCell>
          </TableRow>

        </TableHead>

        <TableBody>
        <TableRow>
            <TableCell >Flight n°</TableCell>
            <TableCell> <span className="valuePending">{!this.state.isLoading ? this.state.data.flight_number: ` pending...`}</span></TableCell>
        </TableRow>

        <TableRow>
            <TableCell >Mission name</TableCell>
            <TableCell> <span className="valuePending">{!this.state.isLoading ? this.state.data.mission_name: ` pending...`}</span></TableCell>
        </TableRow>

        <TableRow>
            <TableCell >Launch year</TableCell>
            <TableCell> <span className="valuePending">{!this.state.isLoading ? this.state.data.launch_year: ` pending...`}</span></TableCell>
        </TableRow>

        <TableRow>
            <TableCell >Rocket ID</TableCell>
            <TableCell> <span className="valuePending">{!this.state.isLoading ? this.state.data.rocket.rocket_id: ` pending...`}</span></TableCell>
        </TableRow>

        </TableBody>




        </Table>


        </TableContainer>

    
    
         
     

        
        </div>
    )
  }

}


export default App;
