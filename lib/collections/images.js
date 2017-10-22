import {FilesCollection} from 'meteor/ostrio:files';
Images = new FilesCollection({
    collectionName: 'Images',
    storagePath: '/images',
    allowClientCode: false,
    onBeforeUpload(file) {
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});