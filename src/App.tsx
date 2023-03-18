import React from "react";
import { useState, useEffect, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const inputTask = useRef<HTMLInputElement>(null)


  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    console.log('inputTask', inputTask.current)
    const regex = /^ +$/;
    const task = newTask
    if((task === '' ) || (regex.test(task))){
      setNewTask("")
      return
    }
    addTask(newTask)
    setNewTask("")
    inputTask.current?.focus()
  };

  const addTask = (name: string): void => {
    const newTask: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTask);
  };


  const toogleDoneTask = (i:number): void => {
    const newTasks = [...tasks]
    newTasks[i].done = !newTasks[i].done
    setTasks(newTasks)
  }

  const toogleRemoveTask = (i: number): void => {
    console.log('i', i)
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(i,1)
    setTasks(newTasks)
  }

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          ref={inputTask}

        />
        <button>Cargar</button>
      </form>
      <h2>Lista de tareas</h2>
      {tasks.map((t: ITask, i: number) => (
        <div key={i}>
          <span
            style={{
              textDecoration: t.done ? "line-through" : "",
              marginLeft: "10px",
            }}
          >
            {t.name}
          </span>
          <button style={{ marginLeft: "10px" }} onClick={()=>toogleDoneTask(i)} >{t.done ? "✔️" : "✘"}</button>
          <button style={{ marginLeft: "10px" }} onClick={()=>toogleRemoveTask(i)} >{'☠️'}</button>
        </div>
      ))}
    </>
  );
}

export default App;
