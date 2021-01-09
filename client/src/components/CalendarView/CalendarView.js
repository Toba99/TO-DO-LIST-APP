import {useState} from 'react';
import Timeline from 'react-calendar-timeline';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import './CalendarView.css';
import TodoItem from '../TodoItem';
import { getPriorityColor } from '../../util';

const groups = [
  { id: 1, title: 'Priority 1', stackItems: true, height: 60 },
  { id: 2, title: 'Priority 2', stackItems: true, height: 60 },
  { id: 3, title: 'Priority 3', stackItems: true, height: 60 }
];


function findSelectedTodo(todoId, todos) {
  return todos.find(todo => todo._id === todoId);
}

const CalendarView = ({ todos, onClickDelete, onEdit }) => {
  const items = todos.map(todo => ({
    id: todo._id,
    group: todo.priority,
    title: todo.name,
    ...todo,
    start_time: new Date(todo.dueDate).getTime(),
    end_time: new Date(todo.dueDate).getTime() + 3600000, // default end of start_time + 1 hour.
    canMove: false,
    canResize: false,
    canChangeGroup: false
  }));

  const [selectedTodoId, setSelectedTodoId] = useState(null);

  return (
    <>
      <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-6, 'hour')}
          defaultTimeEnd={moment().add(6, 'hour')}
          itemRenderer={({
            item,
            itemContext,
            getItemProps,
            getResizeProps
          }) => (
            <div
              {...getItemProps({
                style: {
                  background: getPriorityColor(item.priority),
                  border: 'none',
                  color: 'black',
                },
                onMouseDown: () => setSelectedTodoId(item.id) })}>
            <p style={{
              height: itemContext.dimensions.height,
              overflow: "hidden",
              paddingLeft: 3,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              {itemContext.title}
            </p>
            </div>
          )}
      />

      {selectedTodoId ? 
        <TodoItem
          todo={findSelectedTodo(selectedTodoId, todos)}
          onClickDelete={() => {
            setSelectedTodoId(null);
            onClickDelete(selectedTodoId);
          }}
          onEdit={onEdit}
        /> 
        : null}
    </>
  );
}

export default CalendarView;
