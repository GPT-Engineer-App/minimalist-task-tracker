import React, { useState } from "react";
import { Box, Heading, Input, Button, IconButton, Flex, Text, Checkbox, Stack, Spacer } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleEditTask = (id, newText) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <Box maxWidth="600px" margin="auto" p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Todo App
      </Heading>
      <Flex mb={8}>
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a new task" mr={4} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTask}>
          Add Task
        </Button>
      </Flex>
      <Stack spacing={4}>
        {filteredTasks.map((task) => (
          <Flex key={task.id} alignItems="center">
            <Checkbox isChecked={task.completed} onChange={() => handleToggleComplete(task.id)} mr={4} />
            <Text flex={1} textDecoration={task.completed ? "line-through" : "none"}>
              {task.text}
            </Text>
            <IconButton
              icon={<FaEdit />}
              aria-label="Edit task"
              mr={2}
              onClick={() => {
                const newText = prompt("Enter the new task text", task.text);
                if (newText !== null) handleEditTask(task.id, newText);
              }}
            />
            <IconButton icon={<FaTrash />} aria-label="Delete task" onClick={() => handleDeleteTask(task.id)} />
          </Flex>
        ))}
      </Stack>
      <Flex mt={8}>
        <Button colorScheme={filter === "all" ? "blue" : "gray"} onClick={() => setFilter("all")}>
          All
        </Button>
        <Spacer />
        <Button colorScheme={filter === "active" ? "blue" : "gray"} onClick={() => setFilter("active")}>
          Active
        </Button>
        <Spacer />
        <Button colorScheme={filter === "completed" ? "blue" : "gray"} onClick={() => setFilter("completed")}>
          Completed
        </Button>
      </Flex>
    </Box>
  );
};

export default Index;
