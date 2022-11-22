/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { FaBell } from 'react-icons/fa';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { UrgentContext } from '../../contexts/UrgentContext';
import '../style.css';
// import { IStockAlert } from '../../interfaces/AnalyticsInterface';
// import { io } from 'socket.io-client';
// import * as io from 'socket.io-client';

function Alert({ ...args }) {
  const navigate = useNavigate();
  const { setUrgent, urgentList } = useContext(UrgentContext);
  const [notification, setNotification] = useState<string>('empty');

  useEffect(() => {
    setNotification(`${urgentList.length} products are running out of stock`);
  }, [notification]);

  // const [socket, setSocket] = useState<any>(null);
  // const [len, setLen] = useState<number>(0);

  // useEffect(() => {
  //   setSocket(io('http://localhost:8080'));
  // }, []);

  // const runSocket = async () => {
  //   socket?.on('sendAlert', (data: { msg: string; arr: IStockAlert[] }) => {
  //     setLen(data.arr.length);
  //     setNotification(data.msg);
  //     setUrgentList(data.arr);
  //   });
  // };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="d-flex p-5 circle2">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="rounded">
        <DropdownToggle caret={false} className="bg-white border-0 rounded">
          <span
            className="dp-toggle urgent d-flex justify-content-center align-items-center text-dark bg-primary rounded-circle"
            title={`Out of stock products`}
          >
            <FaBell className="text-white" />{' '}
            {urgentList.length ? (
              <span className="urgent-number">{urgentList.length}</span>
            ) : (
              <></>
            )}
          </span>
        </DropdownToggle>
        <DropdownMenu {...args}>
          <div className="alert">
            <DropdownItem text>{notification}</DropdownItem>
            <Button
              color="danger"
              className="text-white"
              onClick={() => {
                navigate(`/transactions/add`);
                setUrgent(urgentList);
              }}
            >
              Order All
            </Button>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

Alert.propTypes = {
  direction: PropTypes.string
};

export default Alert;
