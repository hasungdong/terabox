package com.terabox.demo.services;

import com.terabox.demo.mappers.ScreeningInfoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScreeningInfoService {
    private final ScreeningInfoMapper screeningInfoMapper;
}
