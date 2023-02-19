import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';

export default function ProfileExperience({
  experience,
  isEditable = false,
  experienceEditing,
  setExperienceEditing,
  setExperience,
}: {
  experience: User['experience'];
  isEditable?: boolean;
  experienceEditing?: boolean[];
  setExperienceEditing?: Dispatch<SetStateAction<boolean[]>>;
  setExperience?: Dispatch<SetStateAction<User['experience']>>;
}) {
  return (
    <div>
      {experience.map((exp, index) => (
        <form
          key={index}
          action=""
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setExperienceEditing((exedits) =>
              exedits.map((ex, i) => (i === index ? !ex : ex))
            );
          }}
        >
          {' '}
          {experienceEditing && experienceEditing[index] ? (
            <div className="mr-2 mb-3">
              <label>
                Title <span className="text-yellow-600">*</span>
              </label>
              <InputField
                type="text"
                name="title"
                id="profileExperienceTitle"
                value={exp.title}
                onChange={(e) =>
                  setExperience((exs) => {
                    let tempArr = [...exs];
                    tempArr[index].title = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                Location <span className="text-yellow-600">*</span>
              </label>
              <InputField
                name="location"
                id="profileExperienceLocation"
                value={exp.location}
                onChange={(e) =>
                  setExperience((exs) => {
                    let tempArr = [...exs];
                    tempArr[index].location = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                employer <span className="text-yellow-600">*</span>
              </label>
              <InputField
                type="text"
                id="employer"
                name="employer"
                value={exp.employer}
                onChange={(e) =>
                  setExperience((exs) => {
                    let tempArr = [...exs];
                    tempArr[index].employer = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <div className="flex flex-wrap gap-2">
                <div className="w-full">
                  <label>
                    Start Date <span className="text-yellow-600">*</span>
                  </label>
                  <InputField
                    type="date"
                    name="startdate"
                    value={exp.startDate
                      ?.toDate()
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) =>
                      setExperience((exs) => {
                        if (!e.target.valueAsDate) return exs;

                        let tempArr = [...exs];
                        tempArr[index].startDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    max={exp.endDate?.toDate().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="w-full">
                  <label>End Date</label>
                  <InputField
                    type="date"
                    name="enddate"
                    value={exp.endDate?.toDate().toISOString().substring(0, 10)}
                    onChange={(e) =>
                      setExperience((exs) => {
                        let tempArr = [...exs];
                        tempArr[index].endDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    min={exp.startDate?.toDate().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <p>Description</p>
              <TextArea
                name="info"
                value={exp.description}
                onChange={(e) =>
                  setExperience((exs) => {
                    let tempArr = [...exs];
                    tempArr[index].description = e.target.value;
                    return tempArr;
                  })
                }
              />
            </div>
          ) : (
            <div>
              {exp.image && <img src={exp.image} alt={exp.title} />}
              <h3>{exp.title}</h3>
              <h4>{exp.employer}</h4>
              <h5>{exp.location}</h5>
              <h6>
                {exp.startDate.toDate().toLocaleDateString()}
                {exp.endDate
                  ? ' - ' + exp.endDate.toDate().toLocaleDateString()
                  : ''}
              </h6>
              <div>{exp.description}</div>
            </div>
          )}
          {isEditable && (
            <div className="flex items-center">
              {/* External edit education button */}
              {experienceEditing && experienceEditing[index] ? (
                <Button className="mr-2" type="submit">
                  Save Expererience
                </Button>
              ) : (
                <EditButton
                  onClick={(e) => {
                    e.preventDefault();
                    setExperienceEditing((exedits) =>
                      exedits.map((ex, i) => (i === index ? !ex : ex))
                    );
                  }}
                />
              )}
              {/* External delete education button */}
              <DeleteButton
                onClick={(e) => {
                  e.preventDefault();
                  setExperience((exs) => exs.filter((_, i) => index !== i));

                  setExperienceEditing((exedits) =>
                    exedits.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {isEditable && (
        <Button
          className="inline"
          onClick={() => {
            // Append new empty education to current array of educations
            setExperience((exs) => [
              ...exs,
              {
                title: '',
                location: '',
                employer: '',
                startDate: Timestamp.now(),
                endDate: Timestamp.now(),
                description: '',
              },
            ]);

            setExperienceEditing((exedits) => [...exedits, true]);
          }}
        >
          Add New Experience
        </Button>
      )}
    </div>
  );
}
