import React from 'react';
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            readOnly: true,
        };
        this.delete = props.delete;
        this.update = props.update;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item);
    }
    
    offReadOnlyMode = () => {
        this.setState({readOnly: false});
    }

    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({readOnly: true});
            this.update(this.state.item);
        }
    }

    editEventHandler = (e) => {
        const { name, value } = e.target;
        const thisItem = this.state.item;
        thisItem[name] = value;  // 입력된 필드에 따라 title, target_name, executionTime 업데이트
        this.setState({ item: thisItem });
    }

    checkboxEventHandler = () => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem, readOnly: true });
        this.update(this.state.item);
    }

    render() {
        const { item } = this.state;

        return (
            <ListItem>
                <Checkbox 
                    checked={item.done}
                    onChange={this.checkboxEventHandler}
                />
                <ListItemText>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <InputBase
                            inputProps={{"aria-label": "naked", readOnly: this.state.readOnly}}
                            type="text"
                            name="title"  // 제목 필드
                            value={`제목 : ${item.title}`}
                            multiline={true}
                            fullWidth={true}
                            onClick={this.offReadOnlyMode}
                            onChange={this.editEventHandler}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                        <InputBase
                            inputProps={{"aria-label": "naked", readOnly: this.state.readOnly}}
                            type="text"
                            name="target_name"  // 타겟 이름 필드
                            value={`대상 이름 : ${item.target_name}`}
                            multiline={true}
                            fullWidth={true}
                            onClick={this.offReadOnlyMode}
                            onChange={this.editEventHandler}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                        <InputBase
                            inputProps={{"aria-label": "naked", readOnly: this.state.readOnly}}
                            type="text"
                            name="executionTime"  // 실행 시간 필드
                            value={`시간 : ${item.executionTime}`}
                            fullWidth={true}
                            onClick={this.offReadOnlyMode}
                            onChange={this.editEventHandler}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                    </div>
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
                        <DeleteOutlined/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;
