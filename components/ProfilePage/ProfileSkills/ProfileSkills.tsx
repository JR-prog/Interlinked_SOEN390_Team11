import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';

export default function ProfileSkills({
  skills,
  isEditable = false,
  skillsEditing,
  setSkillsEditing,
  setSkills,
}: {
  skills: User['skills'];
  isEditable?: boolean;
  skillsEditing?: boolean[];
  setSkillsEditing?: Dispatch<SetStateAction<boolean[]>>;
  setSkills?: Dispatch<SetStateAction<User['skills']>>;
}) {
  return (
    <div>
      {skills.map((skill, index) => (
        <form
          action=""
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSkillsEditing((skeditds) =>
              skeditds.map((ski, i) => (i === index ? !ski : ski))
            );
          }}
        >
          {skillsEditing && skillsEditing[index] ? (
            <div className="mr-2 mb-3">
              <label>
                Skill <span className="text-yellow-600">*</span>
              </label>
              <InputField
                type="text"
                name="skill"
                id="profileSkill"
                value={skill.name}
                onChange={(e) =>
                  setSkills((s) => {
                    let tempArr = [...s];
                    tempArr[index].name = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <p>Description</p>
              <TextArea
                name="info"
                value={skill.description}
                onChange={(e) =>
                  setSkills((s) => {
                    let tempArr = [...s];
                    tempArr[index].description = e.target.value;
                    return tempArr;
                  })
                }
              />
            </div>
          ) : (
            <li key={index}>
              {' '}
              {skill.name}
              <p> {skill.description}</p>
            </li>
          )}
          {isEditable && (
            <div className="flex items-center">
              {/* External edit skill button */}
              {skillsEditing && skillsEditing[index] ? (
                <Button className="mr-2" type="submit">
                  Save Skill
                </Button>
              ) : (
                <EditButton
                  onClick={(e) => {
                    e.preventDefault();
                    setSkillsEditing((skeditds) =>
                      skeditds.map((skill, i) => (i === index ? !skill : skill))
                    );
                  }}
                />
              )}
              {/* External delete skill button */}
              <DeleteButton
                onClick={(e) => {
                  e.preventDefault();
                  setSkills((s) => s.filter((_, i) => index !== i));

                  setSkillsEditing((skeditds) =>
                    skeditds.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {/* Adding new skills, appears after all skill list */}
      {isEditable && (
        <Button
          className="inline"
          onClick={() => {
            // Append new empty skill to current array of skills
            setSkills((s) => [
              ...s,
              {
                name: '',
                description: '',
              },
            ]);

            setSkillsEditing((skeditds) => [...skeditds, true]);
          }}
        >
          Add New Skill
        </Button>
      )}
    </div>
  );
}
