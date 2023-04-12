import React, { useEffect, useState } from 'react';
import { getHoaxes, enumDomainName, getOldHoaxes, getNewHoaxCount, getNewHoaxes } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import HoaxView from './HoaxView';
import { useApiProgress } from '../shared/ApiProgress';
import { Spinner } from './Spinner';
import { useParams } from 'react-router-dom';

const HoaxFeed = props => {
    const [hoaxPage, setHoaxPage] = useState({ content: [], last: true, number: 0 });
    const [newHoaxCount, setNewNoaxCount] = useState();
    const { t } = useTranslation();
    const { username } = useParams();

    const initialPath = username ? `/api/1.0/${enumDomainName.users}/${username}/${enumDomainName.hoaxes}?page=`
        : `/api/1.0/${enumDomainName.hoaxes}?page=`;
    const initialHoaxLoadProgress = useApiProgress('get', initialPath);

    let lastHoaxId = 0;
    let firstHoaxId = 0;
    if (hoaxPage.content.length > 0) {
        firstHoaxId = hoaxPage.content[0].id;
        const lastHoaxIndex = hoaxPage.content.length - 1;
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    }
    const oldHoaxPath = username ? `/api/1.0/${enumDomainName.users}/${username}/${enumDomainName.hoaxes}/${lastHoaxId}`
        : `/api/1.0/${enumDomainName.hoaxes}/${lastHoaxId}`
    const loadOldHoaxesProgress = useApiProgress('get', oldHoaxPath, true);

    const newHoaxesPath = username ? `/api/1.0/${enumDomainName.users}/${username}/${enumDomainName.hoaxes}/${firstHoaxId}?direction=after`
        : `/api/1.0/${enumDomainName.hoaxes}/${firstHoaxId}?direction=after`;
    const loadNewHoaxesProgress = useApiProgress('get', newHoaxesPath, true);

    useEffect(() => {
        const getCount = async () => {
            try {
                const response = await getNewHoaxCount(firstHoaxId, username);
                setNewNoaxCount(response.data.count);
            } catch (error) {

            }
        }
        let looper = setInterval(() => getCount(), 10000);
        return function cleanup() {
            clearInterval(looper);
        };
    }, [firstHoaxId, username]);

    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                const response = await getHoaxes(username, page);
                setHoaxPage(previousHoaxPage => ({
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                }));

            } catch (error) {

            }
        }
        loadHoaxes();
    }, [username]);


    const loadOldHoaxes = async () => {
        try {
            const response = await getOldHoaxes(lastHoaxId, username);
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content: [...previousHoaxPage.content, ...response.data.content]
            }));
        } catch (error) {

        }

    }

    const loadNewHoaxes = async () => {
        try {
            const response = await getNewHoaxes(firstHoaxId, username);
            setHoaxPage(previousHoaxPage => ({
                ...previousHoaxPage,
                content: [...response.data, ...previousHoaxPage.content]
            }));
            setNewNoaxCount(0);
        } catch (error) {

        }
    }

    const { content, last } = hoaxPage;
    if (content.length == 0) {
        return (
            <div className='alert alert-secondary text-center'>
                {initialHoaxLoadProgress ? <Spinner /> : t('There are no hoaxes')}
            </div>
        )
    }

    return (
        <div>
            {newHoaxCount > 0 && <div
                className='alert alert-secondary text-center mb-1'
                style={{ cursor: loadNewHoaxesProgress ? 'not-allowed' : 'pointer' }}
                onClick={() => {
                    if (!loadNewHoaxesProgress) {
                        loadNewHoaxes();
                    }
                }}>
                {loadNewHoaxesProgress ? <Spinner /> : t('There are new hoaxes')}
            </div>}
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax} />
            })}
            {!last && (<div
                className='alert alert-secondary text-center'
                style={{ cursor: loadOldHoaxesProgress ? 'not-allowed' : 'pointer' }}
                onClick={() => {
                    if (!loadOldHoaxesProgress) {
                        loadOldHoaxes();
                    }
                }}>
                {loadOldHoaxesProgress ? <Spinner /> : t('Load old hoaxes')}
            </div>)}
        </div>
    );
}

export default HoaxFeed;