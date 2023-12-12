import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
const username = process.env.ID;
const password = process.env.PASS;

function HomePage(props) {
  return <Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
}

export async function getStaticProps() {

const client = await MongoClient.connect(
  `mongodb+srv://${username}:${password}@cluster0.mlwl1tu.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup)=>({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1
  }; 
}

export default HomePage;
