package com.terabox.demo.services;

import com.terabox.demo.dtos.SearchDto;
import com.terabox.demo.entities.ProductEntity;
import com.terabox.demo.mappers.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductMapper productMapper;
    public ProductEntity getProduct(int index){
        return this.productMapper.selectProductByIndex(index);
    }

    public ProductEntity[] getProducts(SearchDto searchDto){
        searchDto.setTotalCount(this.productMapper.selectProductsCountBySearch(searchDto));
        searchDto.setMaxPage(searchDto.getTotalCount() / searchDto.getCountPerPage() + (searchDto.getTotalCount() % searchDto.getCountPerPage() == 0 ? 0 : 1));
        searchDto.setMinPage(1);
        searchDto.setOffset(searchDto.getCountPerPage() * (searchDto.getRequestPage() - 1));
        return this.productMapper.selectProductsBySearch(searchDto);
    }
}
