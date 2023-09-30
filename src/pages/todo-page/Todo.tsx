import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Modal from "../../components/Modal/Modal";
import CustomNavbar from "../../components/NavBar/NavBar";
import "./Todo.css";
import ButtonGroup from "../../components/Button/Buttons";
import { ScrollContainer } from "react-nice-scroll";
import "react-nice-scroll/dist/styles.css";

function TodoApp() {
  const [todos, setTodos] = useState<any>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filteredUserId, setFilteredUserId] = useState<number | null>(null);
  const [filteredTodo, setFilteredTodo] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const [animationParent] = useAutoAnimate();

  const API_URL = "https://dummyjson.com/todos";
  const ADD_TODO_URL = "https://dummyjson.com/todos/add";

  useEffect(() => {
    async function fetchTodos() {
      try {
        Swal.fire({
          title: "Veriler Yükleniyor",
          html: "Lütfen Bekleyiniz...",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await fetch(API_URL);
        const data = await response.json();
        setTodos(data.todos);
        Swal.close();
      } catch (error) {
        console.error("Veriler yüklenirken bir hata oluştu:", error);
        Swal.fire({
          icon: "error",
          title: "Hata",
          text: "Veriler yüklenirken bir hata oluştu.",
        });
      }
    }

    fetchTodos();
  }, []);

  const addTodo = async () => {
    setShowModal(true);
    if (newTodo.trim() !== "") {
      try {
        const response = await fetch(ADD_TODO_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            todo: newTodo,
            completed: false,
            userId: 30,
          }),
        });
        const data = await response.json();
        setTodos([...todos, data]);
        setNewTodo("");
      } catch (error) {
        console.error("Todo eklenirken bir hata oluştu:", error);
      }
    }
  };

  const deleteTodo = async (id: any) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      return data.isDeleted;
    } catch (error) {
      console.error("Todo silinirken bir hata oluştu:", error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      const deletePromises = selectedTodo.map(async (todo: any) => {
        const isDeleted = await deleteTodo(todo.id);
        return { id: todo.id, isDeleted };
      });

      const results = await Promise.all(deletePromises);

      const deletedIds = results
        .filter((result) => result.isDeleted)
        .map((result) => result.id);

      const updatedTodos = todos.filter(
        (todo: any) => !deletedIds.includes(todo.id)
      );
      setTodos(updatedTodos);

      setSelectedTodo([]);
      Swal.fire({
        toast: true,
        icon: "success",
        title: "İşlem Başarılı",
        text: "Seçtiğiniz görev başarı ile silinmiştir.",
        timer: 3000,
        showConfirmButton: false,
        position: "top-end",
      });
    } catch (error) {
      console.error("Görevleri silme sırasında bir hata oluştu:", error);
    }
  };

  const updateTodo = async (todo: any) => {
    try {
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (response?.ok) {
        const updatedData = await response.json();
        console.log("Güncellenmiş veri: ", updatedData);
        return updatedData;
      } else {
        throw new Error("Görev güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Todo güncellenirken bir hata oluştu:", error);
      return null; 
    }
  };

  const handleCompleted = async () => {
    try {
      const updatePromises = selectedTodo?.map(async (todo: any) => {
        const updated = await updateTodo(todo);
        return updated;
      });

      const results = await Promise.all(updatePromises);

      const updatedArray = todos.map((todo: any) => {
        const updatedItem = results?.find((res) => res.id === todo.id);
        return updatedItem ? updatedItem : todo;
      });

      setTodos(updatedArray);


      setSelectedTodo([]);

      Swal.fire({
        toast: true,
        icon: "success",
        title: "İşlem Başarılı",
        text: "Seçilen Todolar başarıyla güncellendi.",
        timer: 3000,
        showConfirmButton: false,
        position: "top-end",
      });
    } catch (error) {
      console.error("Görevleri güncelleme sırasında bir hata oluştu:", error);
    }
  };

  const handleSelected = (item: any, event: any) => {
    if (event?.target?.checked) {
      setSelectedTodo((prevSelectedTodo: any) => {
        const updatedSelectedTodo = [...prevSelectedTodo];
        updatedSelectedTodo.push(item);
        return updatedSelectedTodo;
      });
    } else {
      setSelectedTodo((prevSelectedTodo: any) => {
        const updatedSelectedTodo = prevSelectedTodo.filter(
          (selectedItem: any) => selectedItem.id !== item.id
        );
        return updatedSelectedTodo;
      });
    }
  };
  

  useEffect(() => {}, [updateTodo]);
  function filterTodosByUserIdAndTodo() {
    let filteredTodos = todos;

    if (filteredUserId !== null) {
      filteredTodos = filteredTodos.filter(
        (todo: any) => todo.userId === filteredUserId
      );
    }

    if (filteredTodo.trim() !== "") {
      filteredTodos = filteredTodos.filter((todo: any) =>
        todo.todo.toLowerCase().includes(filteredTodo.toLowerCase())
      );
    }

    return filteredTodos;
  }
  
  return (
    <>
      <CustomNavbar />
      {showModal && (
        <Modal
          show={showModal}
          value={newTodo}
          setValue={setNewTodo}
          handleAdd={addTodo}
          handleClose={() => setShowModal(false)}
        />
      )}

      <div>
        <div className="p-5 sticky-header py-2">
          <div>
            <h1>Todo List</h1>
            <div className="d-flex flex-row align-items-center gap-2">
              <input
                type="text"
                placeholder="User ID'ye göre filtrele"
                value={filteredUserId === null ? "" : filteredUserId.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setFilteredUserId(
                      value === "" ? null : parseInt(value, 10)
                    );
                  }
                }}
                className="form-control w-50"
              />

              <input
                type="text"
                placeholder="Todo'ya göre filtrele"
                value={filteredTodo}
                onChange={(e) => setFilteredTodo(e.target.value)}
                className="form-control w-50"
              />
              <ButtonGroup
                onAddClick={addTodo}
                onDeleteClick={handleDelete}
                onCompletedClick={handleCompleted}
              />
            </div>
          </div>
        </div>
        <ScrollContainer>
          <section>
            <div className="d-flex p-3">
              <div>
                <ul
                  ref={animationParent}
                  className="p-0 d-flex flex-column gap-2"
                >
                  {filterTodosByUserIdAndTodo().map((todo: any) => (
                    <div key={todo.id}>
                      <div className="form-check d-flex align-items-center gap-2 px-2">
                        <input
                          onChange={(e) => {
                            handleSelected(todo, e);
                          }}
                          className="form-check-input m-0 p-0 border-black"
                          type="checkbox"
                          value=""
                          checked={selectedTodo.includes(todo)}
                          id={`todo-${todo?.id}`}
                        />
                        <label
                          className="form-check-label m-0 p-0"
                          htmlFor="flexCheckDefault"
                        >
                          <li style={{ listStyle: "none" }}>
                            <div className="d-flex">
                              <div
                                className="p-2 rounded w-100"
                                style={{
                                  background: todo?.completed
                                    ? "#19875415"
                                    : "#DC354515",
                                  color: todo?.completed
                                    ? "#198754"
                                    : "#DC3545",
                                }}
                              >
                                {todo.id} - {todo.todo} - {todo.userId}
                              </div>
                            </div>
                          </li>
                        </label>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </ScrollContainer>
      </div>
    </>
  );
}

export default TodoApp;
