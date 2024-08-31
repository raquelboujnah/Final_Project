import { ReactElement } from "react";

const TodoList = () : ReactElement => {
    const todoList = [
        {
            todo: "Make your home Dog-Proof", 
            mini_todo: [
                "Remove toxic products from places your dog can reach, or lock them",
                "Remove toxic plants in your home and yard",
                "Put all the chargers, electric cords in a box, or in a place he cannot reach",
                "Clean your floor from small objects as lego, puzzle pieces",
                "Put a locker on your garbage can and needed cabinets",
                "Move all the breakable things you own on shelves or high spots"
            ]
        },
        { todo: "Find a vet in your neighborhood or nearby your house" },
        { todo: "Start learning training methods" },     
        { todo: "Make friends who are dog owners" },
        { todo: "Find a dog park in your neighborhood" }, 
        {
            todo: "Buy all the first essentials", 
            mini_todo: [
                "Food",
                "Water and food bowls",
                "A bed",
                "Toys",
                "A collar with an identifier",
                "A leash",
                "Poop bags"
            ]
        },
        { todo: "Learn about your future dog's breed" },
        { todo: "Find a friend or a family member to rely on in case of emergency" }
    ];

    const dropdown = (arr: string[]) => {
        return (
            <>
                {arr.map((mini, index) => (
                    <div className="mini_todo">
                        <p key={index}>{mini}</p>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div id="todo_container">
            <h4>We have made a todo list for you to prepare yourself for the dog arrival:</h4>
            {todoList.map((item, index) => (
                <div key={index} className="todo">
                    <div className="big_todo">
                        <h5>{item.todo}</h5>
                        <input className="form-check-input" type="checkbox" id="flexCheckDefault"/>
                    </div>
                    {item.mini_todo && dropdown(item.mini_todo)}
                </div>
            ))}
            <div id="one_more_container"></div>
        </div>
    );
};

export default TodoList;