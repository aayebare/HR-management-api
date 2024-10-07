const Staff = require('../models/staff');
const { v4: uuidv4 } = require('uuid');
const upload = require('../middleware/fileUpload')


exports.registerStaff = (req, res) => {
    upload.single('idPhoto')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Error uploading file' });
        }

        const { surname, otherNames, dob, authCode } = req.body;
        const idPhoto = req.file ? req.file.buffer.toString('base64') : '';
        try {
            // Validate the 10-digit authentication code
            if (!authCode || authCode.length !== 10) {
                return res.status(400).json({ status: 'error', message: 'Invalid authentication code.' });
            }

            const employeeNumber = `EMP${uuidv4().slice(0, 7)}`;

            // Create a new staff object
            const newStaff = new Staff({
                employeeNumber,
                surname,
                otherNames,
                dob,
                authCode,
                idPhoto
            });

            // Save to MongoDB
            await newStaff.save();

            return res.status(201).json({
                status: 'success',
                message: 'Staff member registered successfully.',
                employeeNumber
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'error', message: 'Server error. Could not register staff.' });
        }
    });
};

// Retrieve staff details
exports.getStaff = async (req, res) => {
    const { employeeNumber } = req.params;

    try {
        if (employeeNumber) {
            const staff = await Staff.findOne({ employeeNumber });
            if (!staff) {
                return res.status(404).json({ status: "error", message: "Staff not found." });
            }

            // Format idPhoto to Base64 data URL if it exists
            if (staff.idPhoto) {
                staff.idPhoto = `data:image/jpeg;base64,${staff.idPhoto}`;
            }

            return res.json(staff);
        }

        // If no employeeNumber, return all staff members
        const staffMembers = await Staff.find();

        // Format idPhoto for all staff members
        staffMembers.forEach(staff => {
            if (staff.idPhoto) {
                staff.idPhoto = `data:image/jpeg;base64,${staff.idPhoto}`;
            }
        });

        return res.json(staffMembers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Server error. Could not retrieve staff details." });
    }
};


// Update staff details
exports.updateStaff = (req, res) => {
    upload.single('idPhoto')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Error uploading file' });
        }

        const { employeeNumber } = req.params;
        const { dob } = req.body;
        const idPhoto = req.file ? req.file.buffer.toString('base64') : null;

        try {
            const staff = await Staff.findOne({ employeeNumber });
            if (!staff) {
                return res.status(404).json({ status: 'error', message: 'Staff not found.' });
            }

            if (dob) staff.dob = dob; 
            if (idPhoto) staff.idPhoto = idPhoto;

            await staff.save();

            return res.json({ status: 'success', message: 'Staff details updated successfully.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'error', message: 'Server error. Could not update staff details.' });
        }
    });
};
