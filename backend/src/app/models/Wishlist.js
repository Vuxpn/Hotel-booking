const { default: mongoose } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const WishListSchema = new Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        wishlist: [
            {
                place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
            },
        ],
    },
    {
        timestamps: true,
    },
);

// Thêm plugin và middleware
WishListSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('WishList', WishListSchema);
