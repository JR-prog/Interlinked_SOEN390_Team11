'use client';

import Link from '@/components/Link/Link';

import { useEffect, useState } from 'react';
import Button from '@/components/Buttons/Button';
import { useAuth } from '@/contexts/AuthContext';
import EditJobPosting from '@/components/Jobs/EditJobPosting';
import { JobPosting, JobPostingWithId } from '@/types/JobPost';
import Card from '@/components/Card/Card';
import { typeCollection, db } from '@/config/firestore';
import { query, collection, orderBy, doc, getDocs } from 'firebase/firestore';
import { UserWithId } from '@/types/User';
import JobPostContainer from '@/components/Jobs/JobPostContainer';
import LoadingScreen from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function ManagePostings() {
  const t = useTranslations('ManageJobs');
  const router = useRouter();
  const locale = useLocale();
  const { currentUser, authUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [jobPostings, setJobPostings] = useState<JobPostingWithId[]>([]);
  const [newJob, setNewJob] = useState(false);

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (currentUser && currentUser.isCompany) {
      fetchJobPostings().then((jobArray) => {
        setJobPostings(jobArray);
      });
    }
    setLoading(false);
  }, []);

  const fetchJobPostings = async () => {
    let jobArray: JobPostingWithId[] = [];
    const jobPostingQuery = query(
      typeCollection<JobPosting>(
        collection(doc(db.users, authUser.uid), 'jobPosts')
      ),
      orderBy('datePosted', 'desc')
    );
    const jobsSnapshot = await getDocs(jobPostingQuery);
    jobsSnapshot.forEach((job) => {
      jobArray.push({ postingId: job.id, ...job.data() });
    });
    return jobArray;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!currentUser || !currentUser.isCompany) {
    // user isnt logged in or the page is still loading
    return (
      <div>
        <p data-testid="base-msg" className="mb-3 text-left text-2xl">
          {t('should-login')}
        </p>
        <div className="flex space-x-1.5">
          <Link href="/login">
            <Button>{t('sign-in')}</Button>
          </Link>
          <Link href="/register">
            <Button>{t('register')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const user: UserWithId = authUser
    ? { userId: authUser.uid, ...currentUser }
    : null;

  return (
    <div>
      {newJob ? (
        <Card className="mb-4">
          <h1 className="text-3xl font-semibold" data-testid="new-job-title">
            {t('create-posting')}
          </h1>
          <hr className="my-1 opacity-10"></hr>
          <EditJobPosting newJob />
        </Card>
      ) : (
        <Button
          onClick={() => setNewJob(true)}
          className="mb-4"
          data-testid="create-new-job"
        >
          {t('create-job')}
        </Button>
      )}
      {jobPostings?.map((job, index) => {
        return (
          <JobPostContainer
            author={user}
            jobPost={job}
            currentUser={currentUser}
            setJobArray={setJobPostings}
            key={index}
            testKey={index}
          />
        );
      })}
    </div>
  );
}
