package com.terabox.demo.services;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.mappers.StoreMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StoreService {
    private final StoreMapper storeMapper;

    public ProductEntity getProduct(int index){
        return this.storeMapper.selectProductByIndex(index);
    }

    public ProductEntity[] getProducts(SearchDto searchDto){
        searchDto.setTotalCount(this.storeMapper.selectProductsCountBySearch(searchDto));
        searchDto.setMaxPage(searchDto.getTotalCount() / searchDto.getCountPerPage() + (searchDto.getTotalCount() % searchDto.getCountPerPage() == 0 ? 0 : 1));
        searchDto.setMinPage(1);
        searchDto.setOffset(searchDto.getCountPerPage() * (searchDto.getRequestPage() - 1));
        return this.storeMapper.selectProductsBySearch(searchDto);
    }
}
