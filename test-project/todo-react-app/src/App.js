import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';
import {call, signout} from './service/ApiService';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			loading:true,
		};
	}

	add=(item)=>{
		call("/todo","POST",item).then((response) =>
		this.setState({items:response.data})
	 );
	}

	delete =(item)=>{
		call("/todo","DELETE",item).then((response) =>
            this.setState({items:response.data})
        );
	}

    update = (item) => {
        call("/todo","PUT",item).then((response)=>
            this.setState({items:response.data})
        );
    }

    componentDidMount(){
        call("/todo","GET",null).then((response)=>
            this.setState({items:response.data, loading:false})
        );
    }

	render() {
		var todoItems = this.state.items.length > 0 &&(
			<Paper style={{margin:16}}>
				<List>
					{this.state.items.map((item,idx)=>(
						<Todo item={item} key={item.id} delete={this.delete}/>
					))}
				</List>
			</Paper>
		);

		var navigationBar = (
			<AppBar position="static">
				<Toolbar>
					<Grid justify="space-between" container>
						<Grid item>
							<Typography variant="h6">인스타 게시글을 카카오톡으로</Typography>
						</Grid>
						<Grid item>
							<Button component={Link} to="/mypage" color="inherit">마이페이지</Button>
						</Grid>
						<Grid item>
							<Button color="inherit" onClick={signout}>로그아웃</Button>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		);

		var todoListPage = (
		<div>
			{navigationBar}
			<Container maxWidth="md">
				<AddTodo add={this.add}/>
				<div className="TodoList">{todoItems}</div>
			</Container>
		</div>
		);

		//로딩 중일 때 표시
		var loadingPage = <h1>로딩 중 .. </h1>
		var content = loadingPage;

		if(!this.state.loading){
			content = todoListPage;
		}

		return (
			<div className='App'>
				{content}
			</div>
		);

	}
}

export default App;
