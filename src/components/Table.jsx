import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { database } from "../FireBase/firebase";
import { Link, useNavigate } from "react-router-dom";

const Table = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // Fetch data from Firestore
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "users"));
            const fetchedData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    // Delete a document
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(database, "users", id));
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting document:", error.message);
        }
    };

    // Navigate to edit form
    const editDataId = (id) => {
        navigate(`/${id}`);
    };

    return (
        <div className="container mt-5 p-4 rounded shadow-sm" style={{ backgroundColor: "#f9f9f9", maxWidth: "900px" }}>
            <h2 className="text-center mb-4 text-primary">User Data</h2>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/">
                    <button className="btn btn-primary px-4">Add Data</button>
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-hover table-striped table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm mx-1"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-warning btn-sm mx-1"
                                            onClick={() => editDataId(item.id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
