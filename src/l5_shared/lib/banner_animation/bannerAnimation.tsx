import React, {useEffect, useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import {Clone, useGLTF} from '@react-three/drei';
import {AnimationAction, AnimationMixer, Euler, Group} from "three";

type Props = {
    path: string,
    startFrame?: number,
    rotation?: Euler,
    repeatTime: number
}

const BannerAnimation = React.memo(({path, startFrame, rotation, repeatTime}: Props) => {
    const groupRef = useRef<Group>(null);

    // Загружаем .gltf модель
    const {scene, animations} = useGLTF(path);

    // Переменная для управления временем анимации
    const mixerRef = useRef<AnimationMixer>();
    const actionsRef = useRef<AnimationAction[]>([]);

    // Стартовый кадр, с которого начнется анимация
    const _startFrame = startFrame ?
        startFrame > 0 ?
            startFrame : 0
        : 0; // Измените на нужный

    const _rotation = rotation ? rotation : new Euler(0, 5 * Math.PI / 3, 11 * Math.PI / 6, 'XYZ')

    const [animationFinished, setAnimationFinished] = useState(false);

    // Инициализация анимации
    useEffect(() => {
        if (groupRef.current !== null) {
            mixerRef.current = new AnimationMixer(groupRef.current);

            actionsRef.current = animations.map((animation) => {
                const action = mixerRef.current!.clipAction(animation);
                action.repetitions = 1;

                action.time = _startFrame * animation.tracks[0].times[animation.tracks[0].times.length - 1] / 100;

                action.play();
                action.enabled = true;

                return action;
            });
        }
    }, [animations, _startFrame, animationFinished]);

    // Обновление анимации на каждом кадре
    useFrame((_, delta) => {
        // Проверяем, достигла ли анимация последнего кадра
        const animationFinished = actionsRef.current.every(
            (action) => action.time >= 99 * action.getClip().tracks[0].times[action.getClip().tracks[0].times.length - 1] / 100
        );

        if (animationFinished) {
            actionsRef.current.forEach((action) => {
                // Устанавливаем время анимации на предпоследний кадр перед достижением конца
                action.enabled = true;
                action.time = (repeatTime > 0 ? repeatTime : 0) * action.getClip().tracks[0].times[action.getClip().tracks[0].times.length - 1] / 100;
            });
        } else {
            mixerRef.current?.update(delta);
        }
    });

    return (
        <group ref={groupRef}
               rotation={_rotation}>
            <Clone object={scene}/>
        </group>
    );
});

export default BannerAnimation;