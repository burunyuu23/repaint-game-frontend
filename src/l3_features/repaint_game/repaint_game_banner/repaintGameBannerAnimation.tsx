import React, {useRef, useEffect, MutableRefObject, useState} from 'react';
import { useFrame } from '@react-three/fiber';
import {Clone, useGLTF } from '@react-three/drei';
import {AnimationAction, AnimationMixer, Euler, Group} from "three";

const RepaintGameBannerAnimation = React.memo(() => {
    const groupRef = useRef<Group>(null);

    // Загружаем .gltf модель
    const { scene, animations } = useGLTF('/repaint_game_banner/RepaintShinigami.gltf');

    console.log(scene)

    console.log(animations)

    // Переменная для управления временем анимации
    const mixerRef = useRef<AnimationMixer>();
    const actionsRef = useRef<AnimationAction[]>([]);

    // Стартовый кадр, с которого начнется анимация
    const startFrame = 0; // Измените на нужный

    const [animationFinished, setAnimationFinished] = useState(false);

    // Инициализация анимации
    useEffect(() => {
        console.log('hi!')

        if (groupRef.current !== null) {
            mixerRef.current = new AnimationMixer(groupRef.current);

            actionsRef.current = animations.map((animation) => {
                const action = mixerRef.current!.clipAction(animation);
                action.repetitions = 1;

                action.time = startFrame * animation.tracks[0].times[animation.tracks[0].times.length - 1] / 100;
                action.play();
                action.enabled = true;

                console.log(action)
                return action;
            });
        }
    }, [animations, startFrame, animationFinished]);

    // Обновление анимации на каждом кадре
    useFrame((_, delta) => {
        console.log('frame!')

        // Проверяем, достигла ли анимация последнего кадра
        const animationFinished = actionsRef.current.every(
            (action) => action.time >= 99 * action.getClip().tracks[0].times[action.getClip().tracks[0].times.length - 1] / 100
        );

        if (animationFinished) {
            console.log('finished!')
            actionsRef.current.forEach((action) => {
                // Устанавливаем время анимации на предпоследний кадр перед достижением конца
                action.enabled = true;
                action.time = 85 * action.getClip().tracks[0].times[action.getClip().tracks[0].times.length - 1] / 100;
            });
        }
        else {
            mixerRef.current?.update(delta);
        }
    });

    return (
        <group ref={groupRef}
               rotation={new Euler(0,5*Math.PI / 3,11*Math.PI / 6,'XYZ')}>
            <Clone object={scene} />
        </group>
    );
});

export default RepaintGameBannerAnimation;