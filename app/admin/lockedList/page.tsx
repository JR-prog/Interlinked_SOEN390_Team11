'use client';
import Button from '@/components/Buttons/Button';
import Card from '@/components/Card/Card';
import { db, typeCollection } from '@/config/firestore';
import { User, UserWithId } from '@/types/User';
import { doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function lockedList({}) {
  const [loading, setLoading] = useState(true);
  const [banned, setBanned] = useState<UserWithId[]>([]);

  useEffect(() => {
    getDocs(
      query(typeCollection<User>(db.users), where('accountLocked', '==', true))
    ).then((users) => {
      users.forEach((user) => {
        setBanned((cur) => {
          return [...cur, { ...user.data(), userId: user.id }];
        });
      });
      setLoading(false);
    });
  }, []);

  async function unlockAccount(uid: string) {
    // get account of the person reported and set accountLocked to false
    updateDoc(doc(db.users, uid), {
      accountLocked: false,
    });
    window.location.reload();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto text-white">
      <Card className="mb-3">
        <ul>
          {banned.map((user, index) => (
            <li
              key={index}
              className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-3"
            >
              <div className="start flex items-center justify-between">
                <div className="flex items-center justify-center">
                  <p>{user.name}</p>
                </div>
                <Button
                  onClick={() => {
                    unlockAccount(user.userId);
                  }}
                >
                  Unban account
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
      <Link href={'/admin'}>
        <Button>Return to reports</Button>
      </Link>
    </div>
  );
}

//   (acct) => {
//     setBanned((cur) => {
//         return [
//             ...cur,
//             acct
//         ]
//     })
//   }
