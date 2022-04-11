import { useEffect, useState } from 'react';
import CountryPicker from '../CountryPicker';

function FormModalDiary({ diaryId, action, setModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    location: '',
    photo: null,
    caption: '',
    visibility: 'private',
  });
  
  useEffect(() => {
    if (action === 'edit') {
      setIsLoading(true);
      console.log(`get data of diary ${diaryId} and fill in form`);
      setIsLoading(false);
    }
  }, [action, diaryId]);

  const onChange = (e) => {
    let value;
    if (e.target.name === 'photo') {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };
  
  const handleOnSubmitForm = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen bg-black opacity-75"
        onClick={() => setModal(false)}
      ></div>
      <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <form onSubmit={handleOnSubmitForm} className="bg-white py-6 px-10 rounded flex flex-col gap-2 md:flex-row md:gap-10">
          {isLoading ? (
            <h1>loading...</h1>
          ) : (
            <div className="min-w-[300px]">
              <h1 className="font-bold text-2xl mb-4">Diary</h1>
              <div className="mb-4">
                <label className="block font-bold mb-1">
                  Country<span className="text-red-700">*</span>
                </label>
                <CountryPicker
                  country={formData.country}
                  onChange={(country) =>
                    setFormData((prev) => ({ ...prev, country }))
                  }
                />
              </div>
              <div className="mb-6">
                <label className="block font-bold mb-1">
                  Location Name<span className="text-red-700">*</span>
                </label>
                <input
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-black placeholder-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type="text"
                  name="location"
                  placeholder="ex: Candi Borobudur"
                  value={formData.location}
                  onChange={onChange}
                />
              </div>
              <div className="mb-6">
                <label className="block font-bold mb-1">
                  Add Photo<span className="text-red-700">*</span>
                </label>
                <input type="file" name="photo" onChange={onChange} />
              </div>
              <div className="mb-6">
                <label className="block font-bold mb-1">Caption</label>
                <textarea
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-black placeholder-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  name="caption"
                  placeholder="ex: The place was great!"
                  onChange={onChange}
                  value={formData.caption}
                />
              </div>
              <div className="mb-6">
                <label className="block font-bold mb-1">Visibility</label>
                <div className="flex items-center gap-2" onChange={onChange}>
                  <input type="radio" value="private" name="visibility" defaultChecked /> Private
                  <input type="radio" value="public" name="visibility" /> Public
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-1 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {action === 'create' ? 'Create +' : 'Edit'}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default FormModalDiary;