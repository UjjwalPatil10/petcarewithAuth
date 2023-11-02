import React, { useEffect, useState } from "react";
import { Box, Button, Container, CssBaseline, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import Swal from "sweetalert2";
const PetDetails = () => {
    const [user, setUser] = useState({
        name: "",
        age: "",
        breed: "",
        animal: "",
        image: "",
    });

    const [records, setRecords] = useState([]);
    const [image, setImage] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);



    const handleChange = (e) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleuploadeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage([...image, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any of the fields are empty
        if (
            user.name === "" ||
            user.age === "" ||
            user.breed === "" ||
            user.animal === ""
        ) {
            Swal.fire("Please enter all fields");
            return;
        }

        if (isEditing) {
            // Update the edited user
            const updatedRecords = records.map((record) => {
                if (record.id === editId) {
                    return { ...user, id: record.id };
                }
                return record;
            });
            setRecords(updatedRecords);
            setEditId(null);
        } else {
            // Create a new user
            const newRecords = { ...user, id: new Date().getTime().toString() };
            setRecords([...records, newRecords]);
        }

        // Clear the user state fields
        setUser({
            name: "",
            age: "",
            breed: "",
            animal: "",
            image: "",
        });

        setIsEditing(false);
    };


    const handleEdit = (id) => {
        const userToEdit = records.find((record) => record.id === id);
        setUser(userToEdit);
        setEditId(id);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        const updatedRecords = records.filter((record) => record.id !== id);
        setRecords(updatedRecords);
    };



    return (
        <>
            {/* Form for adding/editing a user */}
            <section style={{ overflowX: "hidden" }}>

                <div >
                    <Container component="main" maxWidth="xs"
                        sx={{
                            height: "570px",

                            border: "2px solid gray",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: "center",
                            margin: "auto",
                            boxShadow: "10px 10px 20px #ccc",
                            padding: 3,
                            borderRadius: 5,
                            marginTop: 3,
                        }}

                    >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <h3 style={{ textAlign: "center" }}>{isEditing ? "Edit User" : "Pet Profile"}</h3>


                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField

                                    type="text"
                                    style={{ backgroundColor: "white" }}
                                    placeholder='Enter Pet Name..'
                                    onChange={handleChange}
                                    value={user.name}
                                    required
                                    fullWidth
                                    id="name"
                                    name="name"
                                />
                                <TextField
                                    style={{ backgroundColor: "white" }}
                                    type="number"
                                    placeholder='Enter Pet Age here..'
                                    margin="normal"
                                    value={user.age}
                                    onChange={handleChange}
                                    required
                                    // label="Age"
                                    fullWidth
                                    id="age"
                                    name="age"
                                />
                                <TextField
                                    style={{ backgroundColor: "white" }}
                                    placeholder="Enter breed .."
                                    margin="normal"
                                    required
                                    value={user.breed}
                                    onChange={handleChange}
                                    fullWidth
                                    name="breed"
                                    // label="Breed"
                                    type="text"
                                    id="breed"
                                />

                                <TextField
                                    style={{ backgroundColor: "white" }}
                                    placeholder="Enter animal ..."
                                    margin="normal"
                                    required
                                    value={user.animal}
                                    onChange={handleChange}
                                    fullWidth
                                    name="animal"
                                    // label="Animal"
                                    type="text"
                                    id="animal"
                                />

                                <TextField
                                    style={{ backgroundColor: "white" }}

                                    margin="normal"
                                    required
                                    onChange={handleuploadeImage}
                                    fullWidth
                                    name="image"
                                    type="file"
                                    id="image"
                                />




                                {isEditing ? (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        style={{ color: "white" }}
                                        className="bg-dark"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Add User
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Container>
                </div>
                <div className="row mt-5 container d-flex justify-content-center align-items-center m-auto " >
                    {records.map((curUser) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 py-2" key={curUser.id}>
                                <div className="card border-dark border-3"  >
                                    <img src={image[records.indexOf(curUser)]} className="card-img-top img-fluid " alt="" style={{
                                        width: "240px",
                                        height: "170px",
                                        display: "block",
                                        margin: "0 auto", // Center horizontally
                                        marginTop: "10px", // Add a gap from the top
                                    }} />
                                    <div className="card-body">
                                        <h5 className="card-title">Name : {curUser.name}</h5>
                                        <p className="card-text">Age : {curUser.age}</p>
                                        <p className="card-text">Breed : {curUser.breed}</p>
                                        <p className="card-text">Animal : {curUser.animal}</p>
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button className="btn btn-primary" onClick={() => handleEdit(curUser.id)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(curUser.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* footer  */}
                <div className="mt-4">
                    <div class="container-fluid bg-dark text-white py-5 px-sm-3 px-md-5">
                        <div class="row pt-5">
                            <div class="col-lg-4 col-md-12 mb-5">
                                <h1 class="mb-3 display-5 text-capitalize text-white"><span class="text-primary">Pet</span>Lover</h1>
                                <p class="m-0">Being a pet lover means having a genuine passion for animals and a commitment to their well-being. It involves taking responsibility for their pets' health, safety, and happiness. Pet lovers may engage in activities like pet adoption, regular feeding, grooming, and exercise, as well as seeking veterinary care when needed. They enjoy the companionship, loyalty, and unconditional love that pets provide.</p>
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <div class="row">
                                    <div class="col-md-6  mb-5">
                                        <h5 class="text-primary mb-4">Get In Touch</h5>
                                        <p><i class="fa fa-map-marker-alt mr-2"></i>Location, City, Country</p>
                                        <p><i class="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                                        <p><i class="fa fa-envelope mr-2"></i>info@example.com</p>
                                        <div class="d-flex justify-content-center mt-4">
                                            <a class="btn btn-outline-info rounded-circle text-center mr-2 px-0" style={{ width: "36px", height: "36px" }} href="#"><i class="fab fa-twitter"></i></a>
                                            <a class="btn btn-outline-info rounded-circle text-center ml-2 px-0" style={{ width: "36px", height: "36px", marginLeft: "12px" }} href="#"><i class="fab fa-facebook-f" ></i></a>
                                            <a class="btn btn-outline-info rounded-circle text-center ml-2 px-0" style={{ width: "36px", height: "36px", marginLeft: "12px" }} href="#"><i class="fab fa-linkedin-in" ></i></a>
                                            <a class="btn btn-outline-info rounded-circle text-center ml-2 px-0" style={{ width: "36px", height: "36px", marginLeft: "12px" }} href="#"><i class="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-5">
                                        <h5 class="text-primary mb-4">Popular Links</h5>
                                        <div class="d-flex flex-column justify-content-start">
                                            <Button className="btn text-danger text-white " LinkComponent={Link} to="/home" sx={{ margin: 1, color: "white", fontWeight: 400 }}>Home</Button>
                                            <Button className="btn text-white btn btn-outline-info" LinkComponent={Link} to="/petdetails" sx={{ margin: 1, color: "white", fontWeight: 400 }}>Pet Details</Button>
                                            <Button className="btn text-white " LinkComponent={Link} to="/aboutUs" sx={{ margin: 1, color: "white", fontWeight: 400 }}>About</Button>
                                            <Button className="btn text-white " LinkComponent={Link} to="/contactUs" sx={{ margin: 1, color: "white", fontWeight: 400 }}>Contact</Button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="container-fluid text-white py-4 px-sm-3 px-md-5" style={{ background: "#111111" }}>
                        <div class="row">
                            <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                                <p class="m-0 text-white">
                                    &copy; <a class="text-white font-weight-bold" href="https://freewebsitecode.com">Your Site Name</a>. All Rights Reserved.
                                </p>
                            </div>
                            <div class="col-md-6 text-center text-md-right">
                                <ul class="nav d-inline-flex">
                                    <li class="nav-item">
                                        <a class="nav-link text-white py-0" href="#">Privacy</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-white py-0" href="#">Terms</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-white py-0" href="#">FAQs</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-white py-0" href="#">Help</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* List of users with edit and delete functionality */}


        </>
    );
};

export default PetDetails;
