import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { FaLocationDot, FaPlus } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { deleteDepartment, deleteDepartmentResponse } from '../../redux/department/createDepartmentReducer';
import { getEntity } from '../../redux/entity/getSingleEntity';
import haedquarterImg from '../../images/haedquarter.png';

const EntityShow = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  const response = useSelector((state) => state.createDepartmentReducer).message;

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const data = useSelector(state => state.getSingleEntityReducer);

  useEffect(() => {
    if (response === 'department deleted successfully!' || response === 'Error while deleting department!') {
      dispatch(getEntity(id));
      dispatch(deleteDepartmentResponse());
    }
  }, [response]);

  return (
    <div className='page-container'>
      <div className='entity-container'>
        <div className='entity-image-wrapper'>
          <img src={haedquarterImg} alt='' className='entity-image' />
        </div>
        <div className='entity-description'>
          <h3 className='entity-title'>{data.name}</h3>
          <div className='entity-location'><FaLocationDot /> : {data.country}{' '}branch</div>
        </div>
        <p>{data.description}</p>
      </div>

      <div className='departments-container'>
        <h3>Departments</h3>
        <Link className='new-department' to={`../entity/${id}/department/new`}><FaPlus />New department</Link>
        {
          data.departments ? <>
            {
              data.departments.map((department) => {
                return (
                  <div style={{position: 'relative', width: '80%'}} className='department-wrapper'>
                    <Link to={`../entity/${id}/department/${department.id}`} className='department-wrapper-link'>
                      {department.name}
                    </Link>
                    <FaTrash className='delete-department' onClick={() => {dispatch(deleteDepartment(department.id))}}/>
                  </div>
                )
              })
            }
          </> : <></>
        }
        <div>
        </div>
      </div>
    </div>
  )
}

export default EntityShow