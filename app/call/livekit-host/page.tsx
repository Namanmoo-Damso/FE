'use client';

import { useState, useEffect } from 'react';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  useParticipants,
  useTracks,
  VideoTrack,
  AudioTrack,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

function HostView() {
  const participants = useParticipants();
  const tracks = useTracks([Track.Source.Microphone, Track.Source.Camera]);

  // Filter out local participant (host) and get only remote participants
  const remoteParticipants = participants.filter(p => !p.isLocal);

  return (
    <div style={{ padding: '20px' }}>
      <h2>호스트 대기실</h2>
      <p>현재 참가자 수: {remoteParticipants.length}</p>

      {/* 참가자 비디오 그리드 */}
      <div style={{ marginTop: '20px' }}>
        <h3>참가자 화면</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '10px',
          }}
        >
          {remoteParticipants.map(participant => {
            const videoTrack = tracks.find(
              t => t.participant.sid === participant.sid && t.source === Track.Source.Camera
            );
            const audioTrack = tracks.find(
              t => t.participant.sid === participant.sid && t.source === Track.Source.Microphone
            );

            return (
              <div
                key={participant.sid}
                style={{
                  position: 'relative',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  padding: '10px',
                }}
              >
                {videoTrack && (
                  <VideoTrack
                    trackRef={videoTrack}
                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                  />
                )}
                {audioTrack && <AudioTrack trackRef={audioTrack} />}
                <div style={{ marginTop: '8px', textAlign: 'center' }}>
                  <strong>{participant.identity}</strong>
                  {participant.isSpeaking && <span> 🎤</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 참가자 목록 */}
      <div style={{ marginTop: '20px' }}>
        <h3>참가자 목록:</h3>
        <ul>
          {remoteParticipants.map(participant => (
            <li key={participant.sid}>
              {participant.identity}
              {participant.isSpeaking && ' 🎤 말하는 중...'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RoomConnection({ roomName }: { roomName: string }) {
  const [token, setToken] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string>('');

  const hostName = 'Host';

  useEffect(() => {
    const connect = async () => {
      try {
        const response = await fetch('/api/livekit/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomName,
            identity: `${hostName}-${roomName}`,
            name: hostName,
            role: 'host',
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setToken(data.token);
        setUrl(data.livekitUrl);
        setConnected(true);
      } catch (e) {
        console.error('Failed to get token:', e);
        setError('토큰을 가져오는데 실패했습니다.');
      }
    };

    connect();
  }, [roomName]);

  const onDisconnected = () => {
    setConnected(false);
    console.log(`방 ${roomName}에서 나갔습니다`);
  };

  const onError = (error: Error) => {
    console.error(`방 ${roomName} 에러:`, error);
  };

  if (error) {
    return (
      <div style={{ padding: '20px', border: '2px solid red', borderRadius: '8px' }}>
        <h3>{roomName}</h3>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  if (!connected) {
    return (
      <div style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '8px' }}>
        <h3>{roomName}</h3>
        <p>연결 중...</p>
      </div>
    );
  }

  return (
    <div style={{ border: '2px solid #4CAF50', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
        <h3 style={{ margin: 0 }}>{roomName}</h3>
      </div>
      <LiveKitRoom
        serverUrl={url}
        token={token}
        connect={true}
        onDisconnected={onDisconnected}
        onError={onError}
        audio={true}
        video={false}
      >
        <RoomAudioRenderer />
        <HostView />
        <ControlBar variation="minimal" controls={{ camera: false }} />
      </LiveKitRoom>
    </div>
  );
}

export default function LiveKitHostPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch rooms on mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/livekit/rooms');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRooms(data.rooms || []);
      } catch (e) {
        console.error('Failed to fetch rooms:', e);
        setError('방 목록을 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1>LiveKit 호스트</h1>
        <p>방 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1>LiveKit 호스트</h1>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1>LiveKit 호스트</h1>
        <p>활성화된 방이 없습니다.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>LiveKit 호스트</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        총 {rooms.length}개의 방이 활성화되어 있습니다.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
          gap: '20px',
        }}
      >
        {rooms.map(room => (
          <RoomConnection key={room.sid} roomName={room.name} />
        ))}
      </div>
    </div>
  );
}
