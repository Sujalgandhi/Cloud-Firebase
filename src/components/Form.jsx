import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { database } from "../FireBase/firebase";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";

const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            getEditData();
        }
    }, [id]);

    const getEditData = async () => {
        try {
            const docRef = doc(database, "users", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setFormData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateData();
        } else {
            addData();
        }
    };

    const addData = async () => {
        try {
            const docRef = await addDoc(collection(database, "users"), { ...formData });
            console.log("Document added with ID:", docRef.id);
        } catch (error) {
            console.error("Error adding document:", error.message);
        }
    };

    const updateData = async () => {
        try {
            const docRef = doc(database, "users", id);
            await updateDoc(docRef, { ...formData });
            console.log("Document updated successfully!");
        } catch (error) {
            console.log("Error updating document:", error.message);
        }
    };

    return (
        <div className="container mt-5 p-5 rounded shadow-sm" style={{ maxWidth: "600px", backgroundColor: "#f9f9f9" }}>
            <h2 className="mb-4 text-center text-primary">
                {id ? "Edit" : "User"} Registration Form
            </h2>
            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        style={{ borderRadius: "5px" }}
                    />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        style={{ borderRadius: "5px" }}
                    />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">
                        Password
                    </label>
                    <input
                        type={id ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        style={{ borderRadius: "5px" }}
                    />
                </div>

                {/* Submit and Show Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary px-4 py-2">
                        {id ? "Edit" : "Submit"}
                    </button>
                    <Link to="/show">
                        <button type="button" className="btn btn-outline-primary px-4 py-2">
                            Show Data
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Form;
