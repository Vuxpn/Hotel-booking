const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const jwtSecret = 'awuichaiuwchasasdwd123';
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class BookingController {
    //[POST] /booking
    async show(req, res) {
        const { token } = req.cookies;
        const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
            req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            Booking.create({
                place,
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                price,
                user: userData.id,
            })
                .then((doc) => {
                    res.json(doc);
                })
                .catch((err) => {
                    throw err;
                });
        });
    }

    //[Get] /booking
    async getBookings(req, res) {
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            res.json(
                await Booking.find({ user: userData.id }).populate('place'),
            );
        });
    }

    //[DELETE] /booking/:id
    async deleteID(req, res) {
        const { token } = req.cookies;
        const { id } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            res.json(await Booking.deleteOne({ user: userData.id, _id: id }));
        });
    }

    async bookingManager(req, res) {
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            const ownerId = userData.id;
            const places = await Place.find({ owner: ownerId });
            const placeIds = places.map(place => place._id);
            res.json(await Booking.find({
                place: {
                    $in: placeIds
                }
            }).populate('place').populate('user'))
        })
    }


}

module.exports = new BookingController();
