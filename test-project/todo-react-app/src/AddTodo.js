import React from "react";
import { TextField, Paper, Button, Grid } from "@mui/material";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        title: "",
        target_name: "",
        executionTime: "",
      },
    };
    this.add = props.add;
  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem[e.target.name] = e.target.value; // name 속성을 이용해 동적으로 상태 업데이트
    this.setState({ item: thisItem });
  };

  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({
      item: {
        title: "",
        target_name: "",
        executionTime: "",
      },
    });
  };

  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.onButtonClick();
    }
  };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              name="title"
              label="Todo Title"
              placeholder="Add Todo title"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.title}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="target_name"
              label="Target Name"
              placeholder="Enter target name"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.target_name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name="executionTime"
              label="Execution Time"
              placeholder="Enter execution time (HH:MM:SS)"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.executionTime}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.onButtonClick}
            >
              추가하기
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
