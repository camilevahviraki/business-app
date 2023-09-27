import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import userIcon from '../../images/user-show-icon.png';
import docIcon from '../../images/item-splash-image.png';
import { getDepartment } from '../../redux/department/getDepartmentReducer';
import './styles/departments.css';


const DepartmentShow = () => {
    const dispatch = useDispatch();
    const { id, entity_id } = useParams();

    useEffect(() => {
        dispatch(getDepartment(id));
    }, []);

    const data = useSelector(state => state.getDepartmentReducer);

    const {
        members, documents
    } = data;

    const transformDateFormat = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    return (
        <div className='page-container'>
            <h3 className='entity-title'>{data.name}</h3>
            <div className='department-details'>
                <div className='members-wrapper'>
                    <h4 className='members-title'>Members</h4>
                    {
                        members ? members.map((member) => {
                            const {
                                email,
                                first_name,
                                last_name,
                                picture_url,
                                updated_at
                            } = member.data.attributes;

                            return (<Link to={`../entity/${entity_id}/department/${id}/user/${member.data.attributes.id}`} className='member-wrapper'>
                                <div className='member-picture-wrapp'>
                                    <img src={picture_url ? picture_url : userIcon} alt='' className='member-picture' />
                                </div>
                                <div className='member-description'>
                                    <h4>{first_name}{' '}{last_name}</h4>
                                    <p>{email}</p>
                                    <p>updated on: {transformDateFormat(updated_at)}</p>
                                </div>
                            </Link>)
                        }) : <></>
                    }
                </div>
                <div className='members-wrapper'>
                    <h4 className='members-title'>Documents</h4>
                    <Link
                        className='new-department'
                        to={`../entity/${entity_id}/department/${id}/document/new`}
                    >
                        <FaPlus />{' '}New document
                    </Link>
                    {
                        documents ? documents.map((document) => {
                            const {
                                name,
                                data,
                                updated_at
                            } = document.data.attributes;

                            return (<Link to={`../entity/${entity_id}/department/${id}/document/${document.data.attributes.id}`} className='member-wrapper'>
                                <div className='member-picture-wrapp'>
                                    <img src={data ? data : docIcon} alt='' className='member-picture' />
                                </div>
                                <div className='member-description'>
                                    <h4>{name}</h4>
                                    <p>updated on: {transformDateFormat(updated_at)}</p>
                                </div>
                            </Link>)
                        }) : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default DepartmentShow